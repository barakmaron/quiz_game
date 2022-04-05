import { React, useState, useEffect, useImperativeHandle, forwardRef } from 'react'

import '../css/QuestionTimer.scss';

const QuestionTimer = ({time, id, handleTimeFinished}, ref) => {
    const [milliSeconds, setMilliSeconds] = useState(time * 1000);

    useEffect(() => {
        
        if(!milliSeconds) 
        {
            handleTimeFinished();
            setMilliSeconds(time * 1000);
            return;
        }

        const intervalIdMilliSeconds = setInterval(() => {
            setMilliSeconds(milliSeconds - 1);
        }, 1);

        return () => 
        {
            clearInterval(intervalIdMilliSeconds);
            //setMilliSeconds(time * 1000);
        }
        
    }, [milliSeconds]);

    const clearState = (time) => {
        setMilliSeconds(time * 1000);
      };

    useImperativeHandle(ref, () => {
        return {
            clearState: clearState
        }
     });
  return (
    <>
        <div ref={ref} className='clock'>
            <span className='seconds'>{(milliSeconds / 1000) >> 0}</span>
            :
            <span className='milliSeconds'>{milliSeconds % 1000}</span>
        </div>
      <progress id={id} value={milliSeconds / 1000} max={time}></progress>
    </>
  )
}

export default forwardRef(QuestionTimer)
