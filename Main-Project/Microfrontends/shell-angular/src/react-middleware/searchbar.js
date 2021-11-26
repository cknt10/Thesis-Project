import React, {useRef, useEffect} from 'react';
import { mount } from 'searchbar/SearchbarApp';

const buildSearchbar = () => {
    console.log("hier");
    mount(document.querySelector('#shell_root'));
 }

export default buildSearchbar;
