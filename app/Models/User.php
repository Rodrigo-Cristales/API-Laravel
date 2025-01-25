<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    protected $table = 'Usuarios';
    protected $primaryKey = 'id_usuarios';

    protected $usuarios = [
        'name',
        'email',
        'PASSWORD',
        'fechar_creacion',
        'fecha_actualizacion'
    ];
    protected $hidden =[
        'PASSWORD',  
    ];

    public $timestamps = false;    
}
