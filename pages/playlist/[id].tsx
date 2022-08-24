import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = async ({ query, req }) => {
  const { id } = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id, // the names comes from filename [id].tsx insdie sqaure brackets
      userId: id, // should have userId same as what returned by playlist.
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { playlist },
  };
};

const Playlist = ({
  playlist,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <div>{playlist.name}</div>;
};

export default Playlist;
