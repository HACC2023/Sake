const MiniInfo = ({ imgUrl, headingText, desc, btnText }) => {
  return (
    <div className="d-flex h-auto my-4 px-4 mx-auto">
      <img
        src={imgUrl}
        alt={headingText}
        className="w-50"
        style={{ maxWidth: "620px" }}
      />
      <div>
        <h2>{headingText}</h2>
        <p>{desc}</p>
        <button>{btnText}</button>
      </div>
    </div>
  );
};

export default MiniInfo;
