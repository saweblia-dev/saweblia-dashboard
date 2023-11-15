using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Saweblia_Backend.Models;

namespace Saweblia_Backend.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
        }

        public DbSet<TypeTravail> TypeTravails { get; set; }
        public DbSet<Fee> Fees { get; set; }
        public DbSet<Categorie> Categories { get; set; }
        public DbSet<OnechoiceQuestion> OnechoiceQuestions { get; set; }

        public DbSet<QteQuestion> QteQuestions { get; set; }
        public DbSet<OnechoiceAnswer> OnechoiceAnswers { get; set; }
        public DbSet<QteAnswer> QteAnswers { get; set; }
        public DbSet<Facture> Factures { get; set; }
        public DbSet<Prestation> Prestations { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Commercial> commercials { get; set; }
        public DbSet<Setting> Settings { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Question> Question { get; set; }

        public DbSet<Answer> Answers { get; set; }
        public DbSet<MultiChoiceAnswer> MultiChoiceAnswers { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<QteQuestion>()
                .HasMany(q => q.QteAnswers)
                .WithOne(a => a.Question);

            modelBuilder.Entity<OnechoiceQuestion>()
                .HasMany(q => q.Answers)
                .WithOne(a => a.Question);

            modelBuilder.Entity<Answer>()
            .HasOne(a => a.Prestation);

            modelBuilder.Entity<Facture>()
            .HasOne(f => f.Commercial);


            modelBuilder.Entity<Facture>()
           .HasMany(f => f.Prests)
           .WithMany();

            modelBuilder.Entity<Facture>()
            .HasMany(f => f.Settings)
            .WithMany();
            modelBuilder.Entity<Setting>()
             .HasOne(s =>s.Prestation);

            /*           .UsingEntity<FacturePrestation>();*/

            /*            modelBuilder.Entity<FacturePrestation>()
                .HasOne(sc => sc.Facture)
                .WithMany(s => s.FacturePrestations)
                .HasForeignKey(sc => sc.FactureId);*/

            modelBuilder.Entity<OnechoiceQuestion>().ToTable("OneChoiceQuestions");
            modelBuilder.Entity<QteQuestion>().ToTable("QteQuestions");
            modelBuilder.Entity<OnechoiceAnswer>().ToTable("OneChoiceAnswers");
            modelBuilder.Entity<QteAnswer>().ToTable("QteAnswers");
            modelBuilder.Entity<Prestation>().ToTable("Prestations");
            modelBuilder.Entity<Admin>().ToTable("Admins");
            modelBuilder.Entity<Question>().ToTable("Question");

            modelBuilder.Entity<Answer>()
    .HasOne(a => a.Category)
    .WithMany() // Vous pouvez spécifier .WithMany(c => c.Answers) si nécessaire
    .HasForeignKey(a => a.CategoryId);

            modelBuilder.Entity<MultiChoiceAnswer>()
           .HasOne(m => m.Answer)
           .WithMany()
           .HasForeignKey(m => m.IdAnswer)
           .OnDelete(DeleteBehavior.Cascade);

         


        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        public DbSet<Saweblia_Backend.Models.Answer>? Answer { get; set; }

        public DbSet<Saweblia_Backend.Models.MultiChoiceAnswer>? MultiChoiceAnswer { get; set; }

       
    }
}