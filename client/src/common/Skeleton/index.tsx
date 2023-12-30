import "./style.scss";

type Props = {
  thickness?: number | string;
  borderRadius?: number | string;
  count: number;
};

function Skeleton({ thickness = "1rem", borderRadius = 5, count }: Props) {
  const skeletonStyle = {
    width: "100%",
    height: thickness,
    borderRadius,
  };
  return (
    <div className="skeletonContainer">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="skeleton" style={skeletonStyle} />
      ))}
    </div>
  );
}

export default Skeleton;
