﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace ReversiApp.Migrations
{
    public partial class CreateSpeler : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Speler",
                columns: table => new
                {
                    SpelerId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naam = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Wachtwoord = table.Column<string>(nullable: true),
                    Rol = table.Column<string>(nullable: true),
                    Token = table.Column<string>(nullable: true),
                    Kleur = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Speler", x => x.SpelerId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Speler");
        }
    }
}