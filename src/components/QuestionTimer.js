import { React, useState, useEffect, useImperativeHandle, forwardRef } from 'react'

import '../css/QuestionTimer.scss';

const QuestionTimer = ({time, id, handleTimeFinished}, ref) => {
    const [milliSeconds, setMilliSeconds] = useState(() => time * 1000);

    useEffect(() => {
        
        if(!milliSeconds) 
        {
            handleTimeFinished();
            return;
        }

        const intervalIdMilliSeconds = setInterval(() => {
            setMilliSeconds(milli => {return milli - 1});
        }, 1);

        return () => 
        {
            clearInterval(intervalIdMilliSeconds);
        }
        
    }, [milliSeconds, handleTimeFinished]);

    const clearState = (time) => {
        setMilliSeconds(() => time * 1000);
      };

    useImperativeHandle(ref, () => {
        return {
            clearState: clearState
        }
     });
  return (
    <>
        <div ref={ref} value={milliSeconds} className='clock'>
            <p className='time seconds'>{(milliSeconds / 1000) >> 0}:{milliSeconds % 100 < 10 ? '0' + milliSeconds % 100 : milliSeconds % 100}</p>
            <p className='milliSeconds'></p>
        </div>
      <progress id={id} value={milliSeconds / 1000} max={time}></progress>
    </>
  )
}

export default forwardRef(QuestionTimer)
