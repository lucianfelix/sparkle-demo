import Image from 'next/image'

export default function Background({ backgroundProps, lazy, host }) {
  const { backgroundContent, isVideo, altText, color, zIndex, type } = backgroundProps;

  const source = host + backgroundContent?._path;

  return (
    <div className={`backgroundWrapper ${isVideo ? "isVideo" : ""}`} style={{ backgroundColor: color, zIndex }}>
      {backgroundContent?.type === "image" && (
        <Image
            src={source}
            alt={altText}
            width={backgroundContent.width}
            height={backgroundContent.height}
            className="backgroundImage"
            //priority={lazy ? false : true}
            priority={!source.includes('uptothesky') || source.includes('sky_m.')}
            sizes="100vw"
            quality="90" />
      )}
      {backgroundContent?.format?.includes("video/") && (
        <video className="videoWrapper" autoPlay loop muted>
          <source src={source} />
        </video>
      )}
    </div>
  );
}
