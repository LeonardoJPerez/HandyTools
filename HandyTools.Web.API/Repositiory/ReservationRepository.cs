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
            InitToolItems(reservations);

            return reservations;
        }

        public Reservation UpdateReservationPickUp(Reservation model)
        {
            var parameter = new Dictionary<object, object>()
            {
                {"id", model.ID},
                {"pickupdate", model.PickUpDate},
                {"pickuphandledby", model.PickUpClerk},
                {"ccnameoncard", model.CCNameOnCard},
                {"ccexpirationdate", model.CCExpirationDate},
                {"ccnumber", model.CCNumber},
                {"cctype", model.CCTYype}
            };

            var reservations = this.Context.Execute<Reservation, object>("SetPickUpInformation", parameter);
            InitToolItems(reservations);

            return reservations.FirstOrDefault();
        }

        public Reservation UpdateReservationDropOff(Reservation model)
        {
            var parameter = new Dictionary<object, object>()
            {
                { "id", model.ID  },
                { "dropoffdate", model.DropOffDate},
                { "dropoffhandledby", model.DropOffClerk  }
            };

            var reservations = this.Context.Execute<Reservation, object>("SetDropOffInformation", parameter);
            InitToolItems(reservations);

            return reservations.FirstOrDefault();
        }

        private void InitToolItems(IEnumerable<Reservation> reservations)
        {
            foreach (var r in reservations)
            {
                var toolIds = r.ToolIDs.Split(',');
                var tools = new List<Tool>();

                foreach (var id in toolIds)
                {
                    tools.Add(this.Context.GetModel<Tool>(nameof(id), Int32.Parse(id)));
                }

                r.ToolItems = tools;
            }
        }
    }
}