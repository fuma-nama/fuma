export interface RankingResponse {
  data: { node: Anime }[];
}

export interface Anime {
  id: number;
  title: string;
  main_picture: {
    medium: string;
    large: string;
  };

  studios?: { id: string; name: string }[];
}

export async function getAnimeRank(): Promise<RankingResponse> {
  const response = await fetch(
    "https://api.myanimelist.net/v2/anime/ranking?ranking_type=all&fields=studios",
    {
      headers: {
        "X-MAL-CLIENT-ID": process.env.MAL_CLIENT_ID!,
      },
    }
  );

  return (await response.json()) as RankingResponse;
}
