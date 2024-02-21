const PlaceholderBookItem = ({
  color,
  text,
}: {
  color: string;
  text: string;
}) => {
  return (
    <div className={`grid place-content-center`} style={{ background: color }}>
      {text}
    </div>
  );
};
export default PlaceholderBookItem;
