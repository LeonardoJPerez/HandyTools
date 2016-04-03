using HandyTools.Models;
using System.Collections.Generic;
using HandyTools.Database;
using HandyTools.Web.API.Interfaces;

namespace HandyTools.Web.API.Repositiory
{
    public class ReservationRepository : BaseRepository, IReservationRepository
    {
        public ReservationRepository(IDbContext context) : base(context) { }

        public Reservation GetReservation(int reservationId)
        {
            return this.Context.GetModel<Reservation>(nameof(reservationId), reservationId.ToString());
        }

        public IEnumerable<Reservation> GetReservations(string userName)
        {
            // Get reservations from db.
            // Load up Tools objects.
            // Load up Handle By Clerk
            // Load up Picked By clerk.

            return this.Context.GetModels<Reservation>(nameof(userName), userName);
        }

        /// <summary>
        /// Creates a new Reservation.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public Reservation CreateReservation(Reservation model)
        {
            return this.Context.AddModel(model);
        }
    }
}