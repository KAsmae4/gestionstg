<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Validator;

class RoleController extends Controller
{
    
    public function index(): JsonResponse
    {
        $roles = Role::all();
        // $roles = Role::whereNotIn('name',['admin'])->get();
        return response()->json($roles);
    }


    public function show(Role $role): JsonResponse
    {
        return response()->json($role);
    }


    public function update(Request $request,Role $role): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name'=> 'required|string|unique:roles,name|max:255',
        ]);
        
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $role->name = $request->input('name');
        $role->save();
        return response()->json(['message'=> 'ok update'], 200);
    }
   
    public function destroy($id): JsonResponse
    {
        try {
            $role = Role::findOrFail($id);
            $role->delete();
            return response()->json(['message' => 'Role deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete role.'], 500);
        }
    }


    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:roles,name|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            $role = Role::create(['name' => $request->name]);
            return response()->json($role, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create role.'], 500);
        }

    }

    
}
