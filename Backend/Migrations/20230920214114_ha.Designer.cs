﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Saweblia_Backend.Data;

#nullable disable

namespace Saweblia_Backend.Migrations
{
    [DbContext(typeof(MyDbContext))]
    [Migration("20230920214114_ha")]
    partial class ha
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Proxies:ChangeTracking", false)
                .HasAnnotation("Proxies:CheckEquality", false)
                .HasAnnotation("Proxies:LazyLoading", true)
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("FacturePrestation", b =>
                {
                    b.Property<int>("FactureId")
                        .HasColumnType("int");

                    b.Property<int>("PrestsId")
                        .HasColumnType("int");

                    b.HasKey("FactureId", "PrestsId");

                    b.HasIndex("PrestsId");

                    b.ToTable("FacturePrestation");
                });

            modelBuilder.Entity("FactureSetting", b =>
                {
                    b.Property<int>("FactureId")
                        .HasColumnType("int");

                    b.Property<int>("SettingsId")
                        .HasColumnType("int");

                    b.HasKey("FactureId", "SettingsId");

                    b.HasIndex("SettingsId");

                    b.ToTable("FactureSetting");
                });

            modelBuilder.Entity("Saweblia_Backend.Models.Admin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Admins", (string)null);
                });

            modelBuilder.Entity("Saweblia_Backend.Models.Answer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("PrestationId")
                        .HasColumnType("int");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("PrestationId");

                    b.ToTable("Answer");

                    b.UseTptMappingStrategy();
                });

            modelBuilder.Entity("Saweblia_Backend.Models.Categorie", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("FirstQuestionId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int?>("TypeTravailId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FirstQuestionId");

                    b.HasIndex("TypeTravailId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Saweblia_Backend.Models.Commercial", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Mrbricolage")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("commercials");
                });

            modelBuilder.Entity("Saweblia_Backend.Models.Facture", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("Annuler")
                        .HasColumnType("int");

                    b.Property<double>("Assurance")
                        .HasColumnType("double");

                    b.Property<int?>("CommercialId")
                        .HasColumnType("int");

                    b.Property<string>("Date")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Desc")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<double>("Fees_Val")
                        .HasColumnType("double");

                    b.Property<string>("Full_name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("MethodePayment")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Prestations")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Quartier")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("TI")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<double>("Tarif")
                        .HasColumnType("double");

                    b.Property<string>("Vendeur")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Ville")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("CommercialId");

                    b.ToTable("Factures");
                });

            modelBuilder.Entity("Saweblia_Backend.Models.Fee", b =>
                {
                    b.Property<int>("Id_Fees")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<double>("Assurance")
                        .HasColumnType("double");

                    b.Property<double>("Fees_Artisan")
                        .HasColumnType("double");

                    b.Property<double>("Fees_SW")
                        .HasColumnType("double");

                    b.Property<double>("Fees_Val")
                        .HasColumnType("double");

                    b.Property<int>("Margin")
                        .HasColumnType("int");

                    b.HasKey("Id_Fees");

                    b.ToTable("Fees");
                });

            modelBuilder.Entity("Saweblia_Backend.Models.Prestation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<double?>("Coefficient")
                        .HasColumnType("double");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<double?>("Duree")
                        .HasColumnType("double");

                    b.Property<string>("Libelle")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Libelle_CRM")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("SearchLibelle")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<double?>("Taux_Horaire")
                        .HasColumnType("double");

                    b.Property<string>("TypePrestation")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Prestations", (string)null);
                });

            modelBuilder.Entity("Saweblia_Backend.Models.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Question");

                    b.UseTptMappingStrategy();
                });

            modelBuilder.Entity("Saweblia_Backend.Models.Setting", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<double>("Artisan")
                        .HasColumnType("double");

                    b.Property<int>("Margin")
                        .HasColumnType("int");

                    b.Property<int?>("PrestationId")
                        .HasColumnType("int");

                    b.Property<double>("Pvttc")
                        .HasColumnType("double");

                    b.HasKey("Id");

                    b.HasIndex("PrestationId");

                    b.ToTable("Settings");
                });

            modelBuilder.Entity("Saweblia_Backend.Models.TypeTravail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Desciption")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("TypeTravails");
                });

            modelBuilder.Entity("Saweblia_Backend.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("full_name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("phone")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Saweblia_Backend.Models.OnechoiceAnswer", b =>
                {
                    b.HasBaseType("Saweblia_Backend.Models.Answer");

                    b.Property<int?>("NextQuestionId")
                        .HasColumnType("int");

                    b.Property<int>("QuestionId")
                        .HasColumnType("int");

                    b.HasIndex("NextQuestionId");

                    b.HasIndex("QuestionId");

                    b.ToTable("OneChoiceAnswers", (string)null);
                });

            modelBuilder.Entity("Saweblia_Backend.Models.QteAnswer", b =>
                {
                    b.HasBaseType("Saweblia_Backend.Models.Answer");

                    b.Property<int>("QuestionId")
                        .HasColumnType("int");

                    b.HasIndex("QuestionId");

                    b.ToTable("QteAnswers", (string)null);
                });

            modelBuilder.Entity("Saweblia_Backend.Models.OnechoiceQuestion", b =>
                {
                    b.HasBaseType("Saweblia_Backend.Models.Question");

                    b.ToTable("OneChoiceQuestions", (string)null);
                });

            modelBuilder.Entity("Saweblia_Backend.Models.QteQuestion", b =>
                {
                    b.HasBaseType("Saweblia_Backend.Models.Question");

                    b.ToTable("QteQuestions", (string)null);
                });

            modelBuilder.Entity("FacturePrestation", b =>
                {
                    b.HasOne("Saweblia_Backend.Models.Facture", null)
                        .WithMany()
                        .HasForeignKey("FactureId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Saweblia_Backend.Models.Prestation", null)
                        .WithMany()
                        .HasForeignKey("PrestsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("FactureSetting", b =>
                {
                    b.HasOne("Saweblia_Backend.Models.Facture", null)
                        .WithMany()
                        .HasForeignKey("FactureId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Saweblia_Backend.Models.Setting", null)
                        .WithMany()
                        .HasForeignKey("SettingsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Saweblia_Backend.Models.Answer", b =>
                {
                    b.HasOne("Saweblia_Backend.Models.Prestation", "Prestation")
                        .WithMany()
                        .HasForeignKey("PrestationId");

                    b.Navigation("Prestation");
                });

            modelBuilder.Entity("Saweblia_Backend.Models.Categorie", b =>
                {
                    b.HasOne("Saweblia_Backend.Models.Question", "FirstQuestion")
                        .WithMany()
                        .HasForeignKey("FirstQuestionId");

                    b.HasOne("Saweblia_Backend.Models.TypeTravail", null)
                        .WithMany("Categories")
                        .HasForeignKey("TypeTravailId");

                    b.Navigation("FirstQuestion");
                });

            modelBuilder.Entity("Saweblia_Backend.Models.Facture", b =>
                {
                    b.HasOne("Saweblia_Backend.Models.Commercial", "Commercial")
                        .WithMany()
                        .HasForeignKey("CommercialId");

                    b.Navigation("Commercial");
                });

            modelBuilder.Entity("Saweblia_Backend.Models.Setting", b =>
                {
                    b.HasOne("Saweblia_Backend.Models.Prestation", "Prestation")
                        .WithMany()
                        .HasForeignKey("PrestationId");

                    b.Navigation("Prestation");
                });

            modelBuilder.Entity("Saweblia_Backend.Models.OnechoiceAnswer", b =>
                {
                    b.HasOne("Saweblia_Backend.Models.Answer", null)
                        .WithOne()
                        .HasForeignKey("Saweblia_Backend.Models.OnechoiceAnswer", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Saweblia_Backend.Models.Question", "NextQuestion")
                        .WithMany()
                        .HasForeignKey("NextQuestionId");

                    b.HasOne("Saweblia_Backend.Models.OnechoiceQuestion", "Question")
                        .WithMany("Answers")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("NextQuestion");

                    b.Navigation("Question");
                });

            modelBuilder.Entity("Saweblia_Backend.Models.QteAnswer", b =>
                {
                    b.HasOne("Saweblia_Backend.Models.Answer", null)
                        .WithOne()
                        .HasForeignKey("Saweblia_Backend.Models.QteAnswer", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Saweblia_Backend.Models.QteQuestion", "Question")
                        .WithMany("QteAnswers")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Question");
                });

            modelBuilder.Entity("Saweblia_Backend.Models.OnechoiceQuestion", b =>
                {
                    b.HasOne("Saweblia_Backend.Models.Question", null)
                        .WithOne()
                        .HasForeignKey("Saweblia_Backend.Models.OnechoiceQuestion", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Saweblia_Backend.Models.QteQuestion", b =>
                {
                    b.HasOne("Saweblia_Backend.Models.Question", null)
                        .WithOne()
                        .HasForeignKey("Saweblia_Backend.Models.QteQuestion", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Saweblia_Backend.Models.TypeTravail", b =>
                {
                    b.Navigation("Categories");
                });

            modelBuilder.Entity("Saweblia_Backend.Models.OnechoiceQuestion", b =>
                {
                    b.Navigation("Answers");
                });

            modelBuilder.Entity("Saweblia_Backend.Models.QteQuestion", b =>
                {
                    b.Navigation("QteAnswers");
                });
#pragma warning restore 612, 618
        }
    }
}
