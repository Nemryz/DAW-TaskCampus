const Badge = ({ texto }) => {
  return <span className={`badge badge-${texto}`}>{texto}</span>;
};

export default Badge;