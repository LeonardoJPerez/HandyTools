using HandyTools.Models;
using System.Collections.Generic;

namespace HandyTools.Web.API.Interfaces
{
    public interface IReservationRepository
    {
        Reservation CreateReservation(Reservation model);

        IEnumerable<Reservation> GetReservations(string userName);

        Reservation GetReservation(int reservationId);
    }
}