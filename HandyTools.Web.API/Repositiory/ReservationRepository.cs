using HandyTools.Database;
using HandyTools.Models;
using HandyTools.Web.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HandyTools.Web.API.Repositiory
{
    public class ReservationRepository : BaseRepository, IReservationRepository
    {
        public ReservationRepository(IDbContext context) : base(context)
        {
        }

        /// <summary>
        /// Creates a new Reservation.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public Reservation CreateReservation(Reservation model, IEnumerable<Tool> tools)
        {
            var parameters = new Dictionary<object, object>
            {
                { "startDate", model.StartDate  },
                { "endDate", model.EndDate},
                { "username", model.CustomerUserName},
                { "toolIds", string.Join(",", tools.Select(t => t.ID))}
            };

            var newModel = this.Context.Execute<Reservation, object>("InsertReservation", parameters).FirstOrDefault();
            return newModel ?? new Reservation();
        }

        public Reservation GetReservation(int reservationId)
        {
            return this.Context.GetModel<Reservation>(nameof(reservationId), reservationId.ToString());
        }

        public IEnumerable<Reservation> GetReservations(string userName)
        {
            var parameter = new Dictionary<object, object>()
            {
                { "customerUserName", userName  },
            };

            var reservations = this.Context.GetModels<Reservation>(parameter);

            foreach (var r in reservations)
            {
                var toolIds = r.ToolIDs.Split(',');
                var tools = new List<Tool>();

                foreach (var id in toolIds)
                {
                    tools.Add(this.Context.GetModel<Tool>(nameof(id), Int32.Parse(id)));
                }

                r.ToolsItems = tools;
            }

            return reservations;
        }

        public Reservation UpdateReservation(Reservation model)
        {
            return this.Context.SetModel(model);
        }
    }
}