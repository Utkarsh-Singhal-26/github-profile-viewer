/* eslint-disable react/prop-types */
const Box = ({ number, string }) => {
    return (
        <div className="box">
            <p className="digit">{number}</p>
            <p className="text">{string}</p>
        </div>
    );
};

export default Box;
