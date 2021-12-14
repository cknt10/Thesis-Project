import React, {useRef, useEffect} from 'react';
import { mount } from 'searchbar/SearchbarApp';

const buildSearchbar = () => {

    function poll(fn, timeout, interval) {
        var endTime = Number(new Date()) + (timeout || 2000);
        interval = interval || 100;
    
        var checkCondition = function(resolve, reject) {
            // If the condition is met, we're done! 
            var result = fn();
            if(result) {
                resolve(result);
            }
            // If the condition isn't met but the timeout hasn't elapsed, go again
            else if (Number(new Date()) < endTime) {
                setTimeout(checkCondition, interval, resolve, reject);
            }
            // Didn't match and too much time, reject!
            else {
                reject(new Error('timed out for ' + fn + ': ' + arguments));
            }
        };
    
        return new Promise(checkCondition);
    }

    poll(() => { return document.querySelector('#searchbar_container')}, 2000, 10).then((el) => {
        mount(el);
    });
    // mount(document.querySelector('#shell_root'));
 }

export default buildSearchbar;
