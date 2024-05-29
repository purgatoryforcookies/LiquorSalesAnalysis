import "./ViewLayout.scss";

function ViewLayout({ children, height, backGroundColor, color }: any) {
  return (
    <div
      className="viewLayout__container"
      style={{ height: height, backgroundColor: backGroundColor, color: color }}
    >
      {children}
    </div>
  );
}

export default ViewLayout;
