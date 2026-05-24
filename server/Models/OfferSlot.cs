using System.ComponentModel.DataAnnotations.Schema;

namespace Willovate.Api.Models
{
    public class OfferSlot
    {
        public int Id { get; set; }
        public int OfferId { get; set; }
        public Offer? Offer { get; set; }
        public DateTime SlotStart { get; set; }
        public DateTime SlotEnd { get; set; }
        public int Capacity { get; set; }
        public int BookedCount { get; set; }
        public string Status { get; set; } = "Available";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [NotMapped]
        public int AvailableCount => Capacity - BookedCount;
    }
}
