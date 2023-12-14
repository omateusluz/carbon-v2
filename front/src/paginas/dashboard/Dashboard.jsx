import '../../styles/Dashboard.css';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function Dashboard(){

    return (
        <div className="configuracoes">
          <div className="group-wrapper">
            <div className="group">
                <p className="text-wrapper">Mantém a segurança de seu dinheiro.</p>
            </div>
          </div>
        </div>
      );
};