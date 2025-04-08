import {useState} from 'react'
import {Button} from './ui/button'
import { BadgeHelp } from 'lucide-react'
import {Link} from 'react-router-dom'
import {Routes, Route} from 'react-router-dom'


function CustomButton({ onClick,label, icon:Icon}) {   //The logo sits at Icon
    return (
      <Button onClick={onClick}>
        <Icon />
        {label}
      </Button>
    );
  }

export {CustomButton}