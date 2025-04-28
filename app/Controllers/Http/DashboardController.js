'use strict'
const Event = use('App/Models/Event')
const Database = use('Database')

class DashboardController {
  async index({ view }) {
    try {
      // Query untuk mendapatkan semua event beserta dokumen terkait
      const events = await Database
        .select(
          'events.*',
          'document_management.id as document_id',
          'document_management.images as document_images',
          'document_management.description as document_description'
        )
        .from('events')
        .leftJoin('document_management', 'events.id', 'document_management.event_id')
        .orderBy('events.created_at', 'desc');

      // Format data images jika disimpan sebagai JSON string
      const formattedEvents = events.map(event => {
        return {
          ...event,
          document_images: event.document_images 
            ? JSON.parse(event.document_images) 
            : [],
          has_document: !!event.document_id // Tambahkan flag apakah punya dokumen
        };
      });

      return view.render('user.dashboard', {
        events: formattedEvents
      });

    } catch (error) {
      console.error('Error in DashboardController:', error);
      return view.render('user.dashboard', {
        events: [],
        error: 'Failed to load events data'
      });
    }
  }
}

module.exports = DashboardController