import logo from "../assets/suppaduppa-logo.png";
function MiniLogo(){ return <img src={logo} alt="" className="mock-logo"/>; }
function Hat({tone="#111"}){ return <div className="mock hat" style={{"--tone":tone}}><div className="hat-crown"/><div className="hat-brim"/><MiniLogo/></div>; }
function Tank(){ return <div className="mock tank"><div className="tank-neck"/><MiniLogo/></div>; }
function Hoodie(){ return <div className="mock hoodie"><div className="hood"/><MiniLogo/><div className="pocket"/></div>; }
function Tee(){ return <div className="mock tee"><div className="sleeve left"/><div className="sleeve right"/><MiniLogo/></div>; }
export default function ProductMock({kind}){
 if(kind==="tank") return <Tank/>; if(kind==="hoodie") return <Hoodie/>; if(kind==="denimHat") return <Hat tone="#b7d5e6"/>; if(kind==="blackHat") return <Hat tone="#191919"/>; if(kind==="pinkHat") return <Hat tone="#ff9bd0"/>; if(kind==="tee"||kind==="sticker") return <Tee/>; return <Hat/>;
}
