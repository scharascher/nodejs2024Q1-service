-- CreateTable
CREATE TABLE "FavTracks" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,

    CONSTRAINT "FavTracks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavAlbums" (
    "id" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,

    CONSTRAINT "FavAlbums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavArtists" (
    "id" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "FavArtists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavTracks_trackId_key" ON "FavTracks"("trackId");

-- CreateIndex
CREATE UNIQUE INDEX "FavAlbums_albumId_key" ON "FavAlbums"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "FavArtists_artistId_key" ON "FavArtists"("artistId");

-- AddForeignKey
ALTER TABLE "FavTracks" ADD CONSTRAINT "FavTracks_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavAlbums" ADD CONSTRAINT "FavAlbums_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavArtists" ADD CONSTRAINT "FavArtists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
