/* xxxxeslint-disable @next/next/no-img-element */

import Image from 'next/image'

export default function LayerImage({ data, panelNr, host }) {
  const { image, altText, layerId, id, overflow, basePosition, debug, fit, forceLoad } = data;

  const source = host + image?._path;

  return (
    <div className={`overflowImageWrapper  ${overflow ? "showOverflow" : "hideOverflow"}`}>
      <div
        id={layerId}
        className={`layerImage ${fit || ""} ${basePosition || "center-center"} ${debug ? "debug" : ""} ${
          overflow ? "showOverflow" : "hideOverflow"
        }`}
      >
          <Image
          id={id}
          src={source}
          className="image"
          alt={altText?.plaintext}
          width={image.width}
          height={image.height}
          //priority={panelNr === 0 ? true : false}
          //fetchpriority={layerId === 'biker-layer' ? 'high' : ''}
          priority={true}
        //   priority={
        //     (panelNr === 0 && !source.includes('_m.') && !source.includes('sky0.'))
        //   //   (panelNr === 0 && !source.includes('_m.') && !source.includes('sky0.'))
        //   // || layerId === 'biker-layer'
        // }
          quality="90"
          // loading={layerId === 'biker-layer' ? 'eager' : 'lazy'}
          sizes={
            layerId === 'biker-layer' ? "(max-width: 840px) 100vw, 40vw" : 
            layerId === 'layer-rocks1' ? "(max-width: 840px) 100vw, 70vw" : 
            layerId === 'layer-rocks2' ? "(max-width: 840px) 100vw, 90vw" :
            layerId === 'rocks3' ? "(max-width: 840px) 100vw, 75vw" :
            layerId === 'female-hiker-layer' ? "(max-width: 840px) 100vw, 30vw" :
            "100vw"
          }
          // loading={panelNr === 0 || forceLoad ? "eager" : "lazy"}
        />
      </div>
    </div>
  );
}
