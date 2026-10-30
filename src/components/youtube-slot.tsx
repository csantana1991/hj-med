export function YoutubeSlot({ id, title, fill }: { id: string; title: string; fill?: boolean }) {
  return (
    <iframe
      className="block w-full bg-black"
      style={{ height: fill ? "100%" : "min(46vh, 400px)", minHeight: fill ? "220px" : undefined, width: "100%" }}
      src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&playsinline=1&enablejsapi=1`}
      title={title}
      id="hj-yt"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}