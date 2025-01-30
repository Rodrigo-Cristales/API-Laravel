<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
//hash
use Illuminate\Support\Facades\Hash;
//auth
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        $user = User::all();

        return response()->json(['user' => $user]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json(['Error al ingresar los datos' => $validator->errors()], 422);
        }
        try {
            $user = new User();
            $user->name = $request->name;
            $user->email = strtolower($request->email);
            $user->password = Hash::make($request->password);
            $user->save();

            $token = $user->createToken('auth_token', ['*'], now()->addMinutes(5));
            return response()->json(['token' => $token->plainTextToken, 'user' => $user, 'token_type' => 'Bearer'], 200);
        } catch (\Exception $e) {
            return response()->json(['Error al crear el usuario' => $e->getMessage()], 500);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json(['Error al ingresar los datos' => $validator->errors()], 422);
        }

        $credentials = request(['email', 'password']);

        if (!Auth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = $request->user();
        $user->tokens()->delete();
        $token = $user->createToken('auth_token', ['*'], now()->addMinutes(5));

        return response()->json([
            'access_token' => $token->plainTextToken,
            'token_type' => 'Bearer',
            'expires_at' => now()->addMinutes(5)->toDateTimeString()
        ]);
    }

    public function refreshToken(Request $request)
    {
        if (!$request->user()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Verificar si el token actual está próximo a expirar
        $currentToken = $request->user()->currentAccessToken();
        if ($currentToken && $currentToken->created_at->addMinutes(4)->isFuture()) {
            return response()->json([
                'error' => 'El token actual aún es válido',
                'expires_at' => $currentToken->created_at->addMinutes(5)->toDateTimeString()
            ], 400);
        }

        // Revocar tokens anteriores
        $request->user()->tokens()->delete();
        // Crear nuevo token
        $token = $request->user()->createToken('auth_token', ['*'], now()->addMinutes(5));

        return response()->json([
            'access_token' => $token->plainTextToken,
            'token_type' => 'Bearer',
            'expires_at' => now()->addMinutes(5)->toDateTimeString()
        ]);
    }

    public function logout(Request $request)
    {
        if (!$request->user()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Revocar todos los tokens del usuario
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Sesión cerrada exitosamente']);
    }
}
