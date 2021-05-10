import Square from "./Square";

function Board({squares, onClick, num}) {

  return (
    <div>
      {Array(num)
        .fill(null)
        .map((item, ix) => (
          <div key={ix} className="board-row">
            {squares.map(
              (item, index) =>
                index >= num * ix &&
                index < num * (ix + 1) && (
                  <Square
                    key={index}
                    value={item}
                    onClick={onClick}
                    dataIndex={index}
                  />
                )
            )}
          </div>
        ))}
    </div>
  );
}

export default Board;
