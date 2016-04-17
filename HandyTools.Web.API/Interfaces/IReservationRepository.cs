using HandyTools.Models;
using System.Collections.Generic;

namespace HandyTools.Web.API.Interfaces
{
    public interface IReservationRepository
    {
        Reservation CreateReservation(Reservation model, IEnumerable<Tool> tools);

        IEnumerable<Reservation> GetReservations(string userName);

        Reservation GetReservation(int reservationId);

        Reservation UpdateReservation(Reservation model);
    }
}