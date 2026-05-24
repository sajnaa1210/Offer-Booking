using Microsoft.EntityFrameworkCore;
using Willovate.Api.Models;

namespace Willovate.Api.Data
{
    public class WillovateDbContext : DbContext
    {
        public WillovateDbContext(DbContextOptions<WillovateDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users => Set<User>();
        public DbSet<Business> Businesses => Set<Business>();
        public DbSet<Offer> Offers => Set<Offer>();
        public DbSet<OfferSlot> OfferSlots => Set<OfferSlot>();
        public DbSet<Booking> Bookings => Set<Booking>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
            modelBuilder.Entity<Booking>().HasIndex(b => b.BookingReference).IsUnique();
            modelBuilder.Entity<Offer>().Property(o => o.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            modelBuilder.Entity<OfferSlot>().Property(s => s.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            base.OnModelCreating(modelBuilder);
        }
    }
}
