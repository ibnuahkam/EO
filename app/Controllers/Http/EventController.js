'use strict'

const Helpers = use('Helpers')
const Event = use('App/Models/Event')
const DocumentManagement = use('App/Models/DocumentManagement')
const fs = require('fs')
const path = require('path')
const Database = use('Database')

class EventController {
  async store({ request, response }) {
    console.log('[DEBUG] Mulai proses create event...')

    try {
      // Setup direktori
      const uploadDir = 'uploads/images'
      const uploadPath = Helpers.publicPath(uploadDir)

      if (!fs.existsSync(uploadPath)) {
        console.log(`[DEBUG] Membuat folder: ${uploadPath}`)
        fs.mkdirSync(uploadPath, { recursive: true })
      }

      fs.accessSync(uploadPath, fs.constants.W_OK)
      console.log('[DEBUG] Folder upload bisa ditulis')

      // Ambil data form
      const {
        user_id,
        title,
        description,
        location,
        date,
        status,
        document_description
      } = request.all()

      // Cek judul event
      const existingEvent = await Event.query().where('title', title).first()
      if (existingEvent) {
        return response.status(400).json({ message: 'Judul event sudah digunakan' })
      }

      // Buat event baru
      const event = await Event.create({
        user_id,
        title,
        description,
        location,
        date,
        status,
        no_ticket: `EO${new Date().getFullYear()}${String((await Event.getCount()) + 1).padStart(3, '0')}`
      })

      console.log('[DEBUG] Event berhasil dibuat:', event.toJSON())

      // Upload file
      let uploadedNames = []

      // Ambil file, baik array maupun single
      let imageFiles = request.file('images', {
        types: ['image'],
        size: '2mb'
      })
      
      // Jika multiple
      if (Array.isArray(imageFiles)) {
        for (const image of imageFiles) {
          await handleFile(image)
        }
      } else if (imageFiles) {
        await handleFile(imageFiles)
      }
      
      async function handleFile(image) {
        const fileName = `${Date.now()}-${image.clientName.replace(/\s+/g, '-')}`
        await image.move(uploadPath, {
          name: fileName,
          overwrite: true
        })
      
        if (image.moved()) {
          uploadedNames.push(fileName)
          console.log(`[DEBUG] File berhasil diupload: ${fileName}`)
        } else {
          console.error('[ERROR] Gagal memindahkan file:', image.errors())
        }
      }

      // Simpan data document
      const doc = await DocumentManagement.create({
        user_id,
        event_id: event.id,
        images: JSON.stringify(uploadedNames),
        description: document_description
      })

      console.log('[DEBUG] Document berhasil disimpan:', doc.toJSON())

      // Verifikasi file benar-benar tersimpan
      const missing = uploadedNames.filter(name => !fs.existsSync(path.join(uploadPath, name)))
      if (missing.length > 0) {
        console.error('[ERROR] File berikut tidak ditemukan di folder:', missing)
      }

      return response.status(201).json({
        success: true,
        message: 'Event berhasil dibuat',
        event,
        document: doc,
        uploaded_files: uploadedNames
      })

    } catch (error) {
      console.error('[ERROR] Gagal create event:', error)
      return response.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat membuat event',
        error: error.message,
        stack: error.stack
      })
    }
  }

  async view({ params, view, response }) {
    try {
      const event = await Database
        .select(
          'events.*',
          'document_management.id as document_id',
          'document_management.images as document_images',
          'document_management.description as document_description',
          'users.name as user_name',
          'users.name as user_fullname'
        )
        .from('events')
        .leftJoin('document_management', 'events.id', 'document_management.event_id')
        .leftJoin('users', 'events.user_id', 'users.id')
        .where('events.id', params.id)
        .first();
  
      if (!event) {
        return response.status(404).send('Event tidak ditemukan');
      }
  
      // Format images JSON jika perlu
      event.document_images = event.document_images
        ? JSON.parse(event.document_images)
        : [];
  
      return view.render('user.view', { event });
  
    } catch (error) {
      console.error('Error in EventController.view:', error);
      return response.status(500).send('Terjadi kesalahan saat memuat data event');
    }
  }
}

module.exports = EventController