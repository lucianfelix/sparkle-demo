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
          priority={layerId === 'layer-rocks1' 
              || layerId === 'layer-rocks2' 
              || layerId === 'rocks3'
              || layerId === 'biker-layer'
              
              ? true : false}
          quality="90"
          // loading={panelNr === 0 || forceLoad ? "eager" : "lazy"}
        />
      </div>
    </div>
  );
}
