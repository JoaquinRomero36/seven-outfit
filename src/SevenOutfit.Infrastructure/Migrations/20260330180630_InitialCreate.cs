using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SevenOutfit.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Price = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Category = table.Column<int>(type: "integer", nullable: false),
                    Size = table.Column<int>(type: "integer", nullable: false),
                    Color = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Stock = table.Column<int>(type: "integer", nullable: false),
                    ImageUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Email = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false),
                    Role = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Category", "Color", "CreatedAt", "ImageUrl", "IsActive", "Name", "Price", "Size", "Stock", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, 2, "Blanco", new DateTime(2026, 3, 30, 18, 6, 29, 407, DateTimeKind.Utc).AddTicks(2138), "https://placehold.co/400x400/white/black?text=Remera+Bendecida", true, "Remera Cristiana Bendecida", 15000m, 2, 20, null },
                    { 2, 3, "Negro", new DateTime(2026, 3, 30, 18, 6, 29, 407, DateTimeKind.Utc).AddTicks(2150), "https://placehold.co/400x400/black/white?text=Buzo+Seven", true, "Buzo Seven Outfit", 35000m, 3, 15, null },
                    { 3, 5, "Azul", new DateTime(2026, 3, 30, 18, 6, 29, 407, DateTimeKind.Utc).AddTicks(2152), "https://placehold.co/400x400/blue/white?text=Gorra+Adventista", true, "Gorra Adventista", 8000m, 1, 30, null },
                    { 4, 1, "Gris", new DateTime(2026, 3, 30, 18, 6, 29, 407, DateTimeKind.Utc).AddTicks(2154), "https://placehold.co/400x400/gray/white?text=Jogger+Faith", true, "Pantalón Jogger Faith", 28000m, 2, 12, null },
                    { 5, 4, "Beige", new DateTime(2026, 3, 30, 18, 6, 29, 407, DateTimeKind.Utc).AddTicks(2156), "https://placehold.co/400x400/beige/black?text=Sweater+Gracias", true, "Suéter Gracias", 42000m, 4, 8, null },
                    { 6, 6, "Negro", new DateTime(2026, 3, 30, 18, 6, 29, 407, DateTimeKind.Utc).AddTicks(2158), "https://placehold.co/400x400/black/white?text=Campera+Urban", true, "Campera Urban Spirit", 55000m, 3, 5, null }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "PasswordHash", "Role" },
                values: new object[] { 1, new DateTime(2026, 3, 30, 18, 6, 29, 407, DateTimeKind.Utc).AddTicks(605), "admin@sevenoutfit.com", "$2a$11$PEmDo7Guo.ZH0hmWFaO/CODAecN5G6EAwQ1TlmSwpdUDt3hBThPKi", "Admin" });

            migrationBuilder.CreateIndex(
                name: "IX_Products_Category",
                table: "Products",
                column: "Category");

            migrationBuilder.CreateIndex(
                name: "IX_Products_IsActive",
                table: "Products",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_Products_Size",
                table: "Products",
                column: "Size");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
