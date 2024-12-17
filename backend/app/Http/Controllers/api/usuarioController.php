<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Models\Usuario;
use App\Models\Rol;

class usuarioController extends Controller
{
    public function __construct()
    {
        parent::__construct(new Usuario());
    }

    public function getUsuarioOne(Request $request, $usuarioId)
    {
        $usuario = Usuario::where('id', $usuarioId)
            ->with('rol')
            ->get();

        return response()->json($usuario);
    }

    public function getUsuarioAll(Request $request)
    {
        $usuarios = Usuario::with('rol')->get();

        return response()->json($usuarios);
    }

    public function crear(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'correo' => 'required|string|email|max:255|unique:usuario',
            'contrasena' => 'required|string|min:8',
            'telefono' => 'required|string|max:15',
            'rol_id' => 'required|integer|exists:rol,id',
        ]);

        $validatedData['contrasena'] = Hash::make($validatedData['contrasena']);

        $usuario = Usuario::create($validatedData);

        return response()->json($usuario, 201);
    }

    public function actualizarId(Request $request, $id)
    {
    $usuario = Usuario::findOrFail($id);
    $data = $request->validate([
        'nombre' => 'sometimes|string|max:255',
        'apellido' => 'sometimes|string|max:255',
        'correo' => 'sometimes|string|email|max:255|unique:usuario,correo,'.$id,
        'contrasena' => 'sometimes|string|min:8',
        'telefono' => 'sometimes|string|max:15',
        'rol_id' => 'sometimes|integer|exists:rol,id',
    ]);

    if(isset($data['contrasena'])){
        $data['contrasena'] = Hash::make($data['contrasena']);
    }

    $usuario->update($data);

    return response()->json($usuario);
    }

}