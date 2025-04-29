'use strict'

const Event = use('App/Models/Event')
const Database = use('Database')
const moment = require('moment') // pakai moment.js

class MyDashboardController {
  async index({ auth, view }) {
    try {
      const userId = auth.user.id;

      const events = await Database
        .select(
          'events.*',
          'document_management.id as document_id',
          'document_management.images as document_images',
          'document_management.description as document_description',
          'users.name as user_name'
        )
        .from('events')
        .leftJoin('document_management', 'events.id', 'document_management.event_id')
        .leftJoin('users', 'events.user_id', 'users.id')
        .where('events.user_id', userId)
        .orderBy('events.created_at', 'desc');

      const formattedEvents = events.map(event => {
        return {
          ...event,
          document_images: event.document_images 
            ? JSON.parse(event.document_images) 
            : [],
          has_document: !!event.document_id,
          user_name: event.user_name
        };
      });

      // Format created_at user dengan moment
      const formattedUser = {
        ...auth.user.toJSON(),
        created_at_formatted: moment(auth.user.created_at).locale('id').format('dddd, DD MMMM YYYY')
      };

      return view.render('user.my_dashboard', {
        events: formattedEvents,
        user: formattedUser
      });

    } catch (error) {
      console.error('Error in MyDashboardController:', error);
      return view.render('user.my_dashboard', {
        events: [],
        error: 'Failed to load events data'
      });
    }
  }
}

module.exports = MyDashboardController