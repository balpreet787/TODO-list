import _ from 'lodash';
import './style.css';
import { header,sidebar, addToListForm, taskDisplay, editTaskForm} from './initialWebsite';
import add from './add';
import display from './display';

header();
sidebar();
addToListForm();
editTaskForm();
taskDisplay();
display();
add(display);
