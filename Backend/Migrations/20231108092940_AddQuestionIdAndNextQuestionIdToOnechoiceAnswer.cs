using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Saweblia_Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddQuestionIdAndNextQuestionIdToOnechoiceAnswer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OneChoiceAnswers_Question_NextQuestionId",
                table: "OneChoiceAnswers");

            migrationBuilder.DropIndex(
                name: "IX_OneChoiceAnswers_NextQuestionId",
                table: "OneChoiceAnswers");

            migrationBuilder.AddColumn<bool>(
                name: "activation_prestation",
                table: "Prestations",
                type: "tinyint(1)",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "NextQuestionId",
                table: "OneChoiceAnswers",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Group",
                table: "Categories",
                type: "longtext",
                nullable: false);

            migrationBuilder.AddColumn<int>(
                name: "OnechoiceAnswerId",
                table: "Answer",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OneChoiceAnswers_NextQuestionId",
                table: "OneChoiceAnswers",
                column: "NextQuestionId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Answer_OnechoiceAnswerId",
                table: "Answer",
                column: "OnechoiceAnswerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Answer_OneChoiceAnswers_OnechoiceAnswerId",
                table: "Answer",
                column: "OnechoiceAnswerId",
                principalTable: "OneChoiceAnswers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OneChoiceAnswers_Question_NextQuestionId",
                table: "OneChoiceAnswers",
                column: "NextQuestionId",
                principalTable: "Question",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answer_OneChoiceAnswers_OnechoiceAnswerId",
                table: "Answer");

            migrationBuilder.DropForeignKey(
                name: "FK_OneChoiceAnswers_Question_NextQuestionId",
                table: "OneChoiceAnswers");

            migrationBuilder.DropIndex(
                name: "IX_OneChoiceAnswers_NextQuestionId",
                table: "OneChoiceAnswers");

            migrationBuilder.DropIndex(
                name: "IX_Answer_OnechoiceAnswerId",
                table: "Answer");

            migrationBuilder.DropColumn(
                name: "activation_prestation",
                table: "Prestations");

            migrationBuilder.DropColumn(
                name: "Group",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "OnechoiceAnswerId",
                table: "Answer");

            migrationBuilder.AlterColumn<int>(
                name: "NextQuestionId",
                table: "OneChoiceAnswers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_OneChoiceAnswers_NextQuestionId",
                table: "OneChoiceAnswers",
                column: "NextQuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_OneChoiceAnswers_Question_NextQuestionId",
                table: "OneChoiceAnswers",
                column: "NextQuestionId",
                principalTable: "Question",
                principalColumn: "Id");
        }
    }
}
