<?php

namespace App\Http\Controllers;

use App\Models\Trainee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;


class TraineeController extends Controller
{
    public function index()
    {
        return Trainee::all();
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'surname' => 'required|string|max:255',
                'email' => 'required|email|unique:trainees',
                'Telephone' => 'required|string|max:255', // Assuming 'tele' was a typo and you meant string
                'etablissement' => 'nullable|string|max:255', // Assuming it's optional
                'CIN' => 'required|string|max:255',
                'Vill' => 'required|string|max:255',
                'date_debut' => 'nullable|date', // Assuming it's optional
                'date_fin' => 'nullable|date',
                'service' =>  'required|string|max:255',
                'file' => 'nullable|file|mimes:pdf|max:2048',
                // Adjust the file validation rules as needed
            ]);

            $trainee = new Trainee();
            $trainee->fill($request->all());

            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('uploads', $fileName); // Store the file in the "uploads" directory
                $trainee->pdf_path = $filePath;
            }

            $trainee->save();

            return response()->json(['message' => 'Trainee created successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while creating the trainee.' . $e], 500);
        }
    }

    public function show(Trainee $trainee)
    {
        return $trainee;
    }

    public function update(Request $request, Trainee $trainee)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'surname' => 'required|string|max:255',
                'email' => 'required|email|unique:trainees,email',
                'Telephone' => 'required|string|max:255', // Add validation for Telephone
                'etablissement' => 'nullable|string|max:255', // Add validation for etablissement
                'CIN' =>  'required|string|max:255', // Add validation for CIN
                'Vill' => 'required|string|max:255', // Add validation for Vill
                'date_debut' => 'nullable|date', // Add validation for date_debut
                'date_fin' => 'nullable|date', // Add validation for date_fin
                'service' =>  'required|string|max:255', // Add validation for service
                'file' => 'nullable|file|mimes:pdf|max:2048', // Add validation for file
                // Adjust the validation rules as needed for other attributes
            ]);

            // Update each attribute individually
            $trainee->name = $request->name;
            $trainee->surname = $request->surname;
            $trainee->email = $request->email;
            $trainee->Telephone = $request->Telephone;
            $trainee->etablissement = $request->etablissement;
            $trainee->CIN = $request->CIN;
            $trainee->Vill = $request->Vill;
            $trainee->date_debut = $request->date_debut;
            $trainee->date_fin = $request->date_fin;
            $trainee->service = $request->service;

            if ($request->hasFile('file')) {
                if ($trainee->pdf_path) {
                    Storage::delete($trainee->pdf_path);
                }

                $file = $request->file('file');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('uploads', $fileName);
                $trainee->pdf_path = $filePath;
            }

            $trainee->save();

            return response()->json(['message' => 'Trainee updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the trainee.'], 500);
        }
    }

    public function destroy(Trainee $trainee)
    {
        $trainee->delete();
        return response()->json(['message' => 'Trainee deleted successfully']);
    }
}
