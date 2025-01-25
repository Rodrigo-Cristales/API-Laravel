<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    protected $table = 'Tokens';
    protected $primarykey = 'id_toke';

    protected $Table_Token =[
        'id_usuario',
        'token',
        'expiracion_token',

    ];

    public $timestamps = true;
}
