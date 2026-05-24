namespace Willovate.Api.Models
{
    public class Offer
    {
        public int Id { get; set; }
        public int BusinessId { get; set; }
        public Business? Business { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public decimal OriginalPrice { get; set; }
        public decimal OfferPrice { get; set; }
        public decimal DiscountPercentage { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int MaxBookingPerCustomer { get; set; } = 1;
        public string TermsAndConditions { get; set; } = string.Empty;
        public string Status { get; set; } = "Draft";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public IList<OfferSlot> Slots { get; set; } = new List<OfferSlot>();
    }
}
