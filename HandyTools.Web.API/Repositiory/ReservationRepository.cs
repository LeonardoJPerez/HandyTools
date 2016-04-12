using HandyTools.Database;
using HandyTools.Models;
using HandyTools.Web.API.Interfaces;
using System.Collections.Generic;

namespace HandyTools.Web.API.Repositiory
{
    public class ReservationRepository : BaseRepository, IReservationRepository
    {
        public ReservationRepository(IDbContext context) : base(context)
        {
        }

        public Reservation GetReservation(int reservationId)
        {
            return this.Context.GetModel<Reservation>(nameof(reservationId), reservationId.ToString());
        }

        public IEnumerable<Reservation> GetReservations(string userName)
        {
            var parameter = new Dictionary<string, object>()
            {
                { "customerUserName", userName  },
            };

            return this.Context.GetModels<Reservation>(parameter);
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