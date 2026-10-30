export function YoutubeSlot({ id, title }: { id: string; title: string }) {
  return (
    <iframe
      className="block w-full bg-black"
      style={{ height: "min(46vh, 400px)", width: "100%" }}
      src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&playsinline=1&enablejsapi=1`}
      title={title}
      id="hj-yt"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
