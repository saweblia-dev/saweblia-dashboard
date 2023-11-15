using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace Saweblia_Backend.Migrations
{
    /// <inheritdoc />
    public partial class has : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    UserName = table.Column<string>(type: "longtext", nullable: false),
                    Password = table.Column<string>(type: "longtext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "commercials",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Mrbricolage = table.Column<string>(type: "longtext", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_commercials", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Fees",
                columns: table => new
                {
                    Id_Fees = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Fees_Val = table.Column<double>(type: "double", nullable: false),
                    Assurance = table.Column<double>(type: "double", nullable: false),
                    Margin = table.Column<int>(type: "int", nullable: false),
                    Fees_SW = table.Column<double>(type: "double", nullable: false),
                    Fees_Artisan = table.Column<double>(type: "double", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fees", x => x.Id_Fees);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Prestations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(type: "longtext", nullable: false),
                    SearchLibelle = table.Column<string>(type: "longtext", nullable: false),
                    Libelle = table.Column<string>(type: "longtext", nullable: false),
                    Taux_Horaire = table.Column<double>(type: "double", nullable: true),
                    Duree = table.Column<double>(type: "double", nullable: true),
                    Coefficient = table.Column<double>(type: "double", nullable: true),
                    Libelle_CRM = table.Column<string>(type: "longtext", nullable: false),
                    TypePrestation = table.Column<string>(type: "longtext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prestations", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Question",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Value = table.Column<string>(type: "longtext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Question", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "TypeTravails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false),
                    Desciption = table.Column<string>(type: "longtext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeTravails", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Email = table.Column<string>(type: "longtext", nullable: false),
                    Password = table.Column<string>(type: "longtext", nullable: false),
                    full_name = table.Column<string>(type: "longtext", nullable: false),
                    phone = table.Column<string>(type: "longtext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Factures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    TI = table.Column<string>(type: "longtext", nullable: false),
                    Quartier = table.Column<string>(type: "longtext", nullable: false),
                    Tarif = table.Column<double>(type: "double", nullable: false),
                    Ville = table.Column<string>(type: "longtext", nullable: false),
                    Date = table.Column<string>(type: "longtext", nullable: false),
                    MethodePayment = table.Column<string>(type: "longtext", nullable: false),
                    Full_name = table.Column<string>(type: "longtext", nullable: false),
                    Phone = table.Column<string>(type: "longtext", nullable: false),
                    Prestations = table.Column<string>(type: "longtext", nullable: false),
                    Desc = table.Column<string>(type: "longtext", nullable: false),
                    Annuler = table.Column<int>(type: "int", nullable: false),
                    CommercialId = table.Column<int>(type: "int", nullable: true),
                    Fees_Val = table.Column<double>(type: "double", nullable: false),
                    Assurance = table.Column<double>(type: "double", nullable: false),
                    Vendeur = table.Column<string>(type: "longtext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Factures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Factures_commercials_CommercialId",
                        column: x => x.CommercialId,
                        principalTable: "commercials",
                        principalColumn: "Id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Answer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Value = table.Column<string>(type: "longtext", nullable: false),
                    PrestationId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Answer_Prestations_PrestationId",
                        column: x => x.PrestationId,
                        principalTable: "Prestations",
                        principalColumn: "Id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Settings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Artisan = table.Column<double>(type: "double", nullable: false),
                    Margin = table.Column<int>(type: "int", nullable: false),
                    Pvttc = table.Column<double>(type: "double", nullable: false),
                    PrestationId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Settings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Settings_Prestations_PrestationId",
                        column: x => x.PrestationId,
                        principalTable: "Prestations",
                        principalColumn: "Id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "OneChoiceQuestions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OneChoiceQuestions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OneChoiceQuestions_Question_Id",
                        column: x => x.Id,
                        principalTable: "Question",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "QteQuestions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QteQuestions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QteQuestions_Question_Id",
                        column: x => x.Id,
                        principalTable: "Question",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false),
                    FirstQuestionId = table.Column<int>(type: "int", nullable: true),
                    TypeTravailId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Categories_Question_FirstQuestionId",
                        column: x => x.FirstQuestionId,
                        principalTable: "Question",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Categories_TypeTravails_TypeTravailId",
                        column: x => x.TypeTravailId,
                        principalTable: "TypeTravails",
                        principalColumn: "Id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FacturePrestation",
                columns: table => new
                {
                    FactureId = table.Column<int>(type: "int", nullable: false),
                    PrestsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FacturePrestation", x => new { x.FactureId, x.PrestsId });
                    table.ForeignKey(
                        name: "FK_FacturePrestation_Factures_FactureId",
                        column: x => x.FactureId,
                        principalTable: "Factures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FacturePrestation_Prestations_PrestsId",
                        column: x => x.PrestsId,
                        principalTable: "Prestations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FactureSetting",
                columns: table => new
                {
                    FactureId = table.Column<int>(type: "int", nullable: false),
                    SettingsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FactureSetting", x => new { x.FactureId, x.SettingsId });
                    table.ForeignKey(
                        name: "FK_FactureSetting_Factures_FactureId",
                        column: x => x.FactureId,
                        principalTable: "Factures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FactureSetting_Settings_SettingsId",
                        column: x => x.SettingsId,
                        principalTable: "Settings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "OneChoiceAnswers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    NextQuestionId = table.Column<int>(type: "int", nullable: true),
                    QuestionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OneChoiceAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OneChoiceAnswers_Answer_Id",
                        column: x => x.Id,
                        principalTable: "Answer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OneChoiceAnswers_OneChoiceQuestions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "OneChoiceQuestions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OneChoiceAnswers_Question_NextQuestionId",
                        column: x => x.NextQuestionId,
                        principalTable: "Question",
                        principalColumn: "Id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "QteAnswers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    QuestionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QteAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QteAnswers_Answer_Id",
                        column: x => x.Id,
                        principalTable: "Answer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QteAnswers_QteQuestions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "QteQuestions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Answer_PrestationId",
                table: "Answer",
                column: "PrestationId");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_FirstQuestionId",
                table: "Categories",
                column: "FirstQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_TypeTravailId",
                table: "Categories",
                column: "TypeTravailId");

            migrationBuilder.CreateIndex(
                name: "IX_FacturePrestation_PrestsId",
                table: "FacturePrestation",
                column: "PrestsId");

            migrationBuilder.CreateIndex(
                name: "IX_Factures_CommercialId",
                table: "Factures",
                column: "CommercialId");

            migrationBuilder.CreateIndex(
                name: "IX_FactureSetting_SettingsId",
                table: "FactureSetting",
                column: "SettingsId");

            migrationBuilder.CreateIndex(
                name: "IX_OneChoiceAnswers_NextQuestionId",
                table: "OneChoiceAnswers",
                column: "NextQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_OneChoiceAnswers_QuestionId",
                table: "OneChoiceAnswers",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_QteAnswers_QuestionId",
                table: "QteAnswers",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Settings_PrestationId",
                table: "Settings",
                column: "PrestationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "FacturePrestation");

            migrationBuilder.DropTable(
                name: "FactureSetting");

            migrationBuilder.DropTable(
                name: "Fees");

            migrationBuilder.DropTable(
                name: "OneChoiceAnswers");

            migrationBuilder.DropTable(
                name: "QteAnswers");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "TypeTravails");

            migrationBuilder.DropTable(
                name: "Factures");

            migrationBuilder.DropTable(
                name: "Settings");

            migrationBuilder.DropTable(
                name: "OneChoiceQuestions");

            migrationBuilder.DropTable(
                name: "Answer");

            migrationBuilder.DropTable(
                name: "QteQuestions");

            migrationBuilder.DropTable(
                name: "commercials");

            migrationBuilder.DropTable(
                name: "Prestations");

            migrationBuilder.DropTable(
                name: "Question");
        }
    }
}
