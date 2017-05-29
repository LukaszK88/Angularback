<?php
namespace App\Http\Controllers;



use Symfony\Component\HttpFoundation\Response as CodeResponse;

/**
 * Class ApiController
 * @package App\Http\Controllers
 */
class ApiController extends Controller
{
    protected $statusCode = 200;

    /**
     * @return int
     */
    public function getStatusCode(){

        return $this->statusCode;

    }

    /**
     * @param $statusCode
     * @return $this
     */
    public function setStatusCode($statusCode){

        $this->statusCode = $statusCode;

        return $this;

    }

    /**
     * @param $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function responseNotFound($message){

        return $this->setStatusCode(CodeResponse::HTTP_NOT_FOUND)->respondWithError($message);
    }

    /**
     * @param $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function responseCreated($message){

        return $this->setStatusCode(CodeResponse::HTTP_CREATED)->respondWithMessage($message);
    }

    public function responseDeleted($message){

        return $this->setStatusCode(CodeResponse::HTTP_OK)->respondWithMessage($message);
    }

    /**
     * @param $token
     * @param $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function tokenCreated($token, $message){

        return $this->setStatusCode(CodeResponse::HTTP_CREATED)->respondWithToken($token, $message);
    }

    /**
     * @param $data
     * @param array $headers
     * @return \Illuminate\Http\JsonResponse
     */
    public function respond($data, $headers = []){

        return response()->json($data, $this->getStatusCode(), $headers = []);
    }

    /**
     * @param $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondWithError($message){

        return $this->respond([
            'error' => $message,
            'status_code' => $this->getStatusCode()

        ]);
    }

    /**
     * @param $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondWithMessage($message){

        return $this->respond([
            'message' => $message,
            'status_code' => $this->getStatusCode()
        ]);
    }

    /**
     * @param $token
     * @param $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondWithToken($token, $message){

        return $this->respond([
            'token' => $token,
            'message' => $message,
            'status_code' => $this->getStatusCode()
        ]);
    }
}