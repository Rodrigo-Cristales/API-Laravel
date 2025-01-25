<?php

namespace App\Http\Controllers;

Use App\Models\User;
Use App\Models\Token;
use Illuminate\Support\Facades\Hash;



use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request){
        $request->validate([
        'email'=>'required|email',
        'password' => 'required',
        ]);

        $usuarios = User::where('email', $request->email)->first();
        
        if(!$usuarios || !Hash::check($request->password, $usuarios->password)){
            return response()->json(['menssage' => 'Credenciales invalidadas'], 401);
        }

        //Generar token;

        $token = bin2hex(random_bytes(32));
        $expiracion = now()->addMinutes(5);

        Token::create([
            'id_usuario' => $usuarios->id_usuario,
            'token' => $token,
            'expiracion' => $expiracion,
        ]);

        return response()->json(['token' => $token, 'expiracion' => $expiracion],200);
    }
}
