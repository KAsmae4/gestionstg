<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function roleCount(): JsonResponse
    {
        try {

            $adminCount = User::whereHas('roles', function ($query) {
                $query->where('name', 'admin');
            })->count();

            $superAdminCount = User::whereHas('roles', function ($query) {
                $query->where('name', 'superAdmin');
            })->count();

            $managerCount = User::whereHas('roles', function ($query) {
                $query->where('name', 'manager');
            })->count();

            return response()->json([
                'admin' => $adminCount,
                'superAdmin' => $superAdminCount,
                'manager' => $managerCount,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function index(): JsonResponse
    {
        $users = User::all();
        return response()->json($users);
    }
    public function show(User $user)
    {
        return response()->json($user);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'Nome' => 'required|string|max:255',
            'Prenom' => 'required|string|max:255',
            'CIN' => 'required',
            'Vill' => 'required|string|max:255',
            'Date_naissance' => 'required|string|max:255',
            'Adresse' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'Telephone' => 'required|string|max:255',
            'service' =>  'required|string|max:255',
            'password' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $user = User::create([
                'Nome' => $request->Nome,
                'Prenom' => $request->Prenom,
                'CIN' => $request->CIN,
                'Vill' => $request->Vill,
                'Date_naissance' => $request->Date_naissance,
                'Adresse' => $request->Adresse,
                'email' => $request->email,
                'Telephone' => $request->Telephone,
                'service' => $request->service,
                'password' => bcrypt($request->password),
            ]);

            if ($request->rolesUser) {
                $user->syncRoles($request->rolesUser);
            }

            return response()->json($user, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create user.'], 500);
        };
    }



    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUser(User $user): JsonResponse
    {
        $user = Auth::user();
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, User $user): JsonResponse
    {
        $validator = Validator::make($request->all(), [

            'Nome' => 'required|string|max:255',
            'Prenom' => 'required|string|max:255',
            'CIN' => 'required',
            'Vill' => 'required|string|max:255',
            'Date_naissance' => 'required|string|max:255',
            'Adresse' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'Telephone' => 'required|string|max:255',
            'service' =>  'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $data = $request->all();
        if (empty($data['password'])) {
            // If password is empty, retain the old password
            unset($data['password']);
        } else {
            // If a new password is provided, hash it
            $data['password'] = Hash::make($data['password']);
        }
        $user->update($data);
        $user->syncRoles($request->rolesUser);

        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(User $user): JsonResponse
    {
        $user->delete();
        return response()->json(null, 204);
    }
}
