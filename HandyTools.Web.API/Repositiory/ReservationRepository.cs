using HandyTools.Models;
using System.Collections.Generic;

namespace HandyTools.Web.API.Repositiory
{
    public class ReservationRepository : BaseRepository
    {
        public Reservation GetReservation(int reservationId)
        {
            return this._db.GetModel<Reservation>(nameof(reservationId), reservationId.ToString());
        }

        public List<Reservation> GetReservations(string userName)
        {
            // Get reservations from db.
            // Load up Tools objects.
            // Load up Handle By Clerk
            // Load up Picked By clerk.

            return this._db.GetModels<Reservation>(nameof(userName), userName);
        }

        public Reservation GetReservations(Reservation model)
        {
            return this._db.AddModel(model);
        }
    }
}