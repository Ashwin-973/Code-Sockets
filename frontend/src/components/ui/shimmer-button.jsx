'use client';

const ShimmerButton = ({label,icon}) => {
  return (
    <div className="flex items-center justify-center">
      <button
        className="whiteshimmerbtn"
        type="button"
      >
        <style jsx>{`
          .whiteshimmerbtn {
            min-width: 130px;
            height: 48px;
            color: #121111;
            padding: 1px 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            display: inline-block;
            outline: none;
            border-radius: 25px;
            border: none;
            background: linear-gradient(45deg, #ffffff, #e9ecef);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 1;
            overflow: hidden;
          }

          .whiteshimmerbtn:before {
            content: "";
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
            transform: rotate(45deg);
            transition: all 0.5s ease;
            z-index: -1;
          }

          .whiteshimmerbtn:hover:before {
            top: -100%;
            left: -100%;
          }

          .whiteshimmerbtn:after {
            border-radius: 25px;
            position: absolute;
            content: "";
            width: 0;
            height: 100%;
            top: 0;
            z-index: -1;
            box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5), 7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            background: linear-gradient(45deg, #f8f9fa, #ced4da);
            right: 0;
          }

          .whiteshimmerbtn:hover:after {
            width: 100%;
            left: 0;
          }

          .whiteshimmerbtn:active {
            top: 2px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            background: linear-gradient(45deg, #ffffff, #e9ecef);
          }

          .whiteshimmerbtn span {
            position: relative;
            z-index: 2;
          }
        `}</style>

        <span className="text-sm font-medium">{label}</span>
      </button>
    </div>
  );
};

export {ShimmerButton};