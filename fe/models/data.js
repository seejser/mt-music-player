export const songData = {
  list: [],
};
export const searchData = {
  text: '',
  list: [],
};

export const artistData = {
  list: Array(10)
    .fill()
    .map((e, i) => ({
      name: `Artist Name ${i}`,
      photo: 'https://p3.music.126.net/F9asgcj7C7qSl_je9XDvRw==/603631883675241.jpg?param=130y130',
    })),
};
export const albumData = {
  list: Array(10)
    .fill()
    .map((e, i) => ({
      title: `Albums Title ${i}`,
      cover:
        'https://p2.music.126.net/bQWhKSp88vIwo85OV1zpNA==/109951163466323994.jpg?param=140y140',
    })),
};