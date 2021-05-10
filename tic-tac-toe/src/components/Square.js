export default function Square({ value, dataIndex, onClick }) {
  return (
    <button className="square" onClick={onClick} data-index={dataIndex}>
      {value}
    </button>
  );
}
