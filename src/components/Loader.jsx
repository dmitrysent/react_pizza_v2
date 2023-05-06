import React from "react"
import ContentLoader from "react-content-loader"

const Loader = (props) => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="501" y="101" rx="3" ry="3" width="140" height="11" />
    <circle cx="130" cy="130" r="130" />
    <rect x="0" y="275" rx="5" ry="5" width="280" height="27" />
    <rect x="0" y="430" rx="5" ry="5" width="90" height="27" />
    <rect x="148" y="421" rx="21" ry="21" width="131" height="44" />
    <rect x="0" y="317" rx="15" ry="15" width="280" height="88" />
  </ContentLoader>
)

export default Loader